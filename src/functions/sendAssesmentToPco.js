// /* BASIC FETCH

// JSON field data structure to update a custom field (need specific field_definition ID)
// {
//   data: {
//     attributes: { value: 65 },
//     relationships: { field_definition: { data: { id: 433567 } } }
//   }
// }

const fetch = require("node-fetch").default

exports.handler = async function(event, context) {
  const { body } = event
  const data = JSON.parse(body)
  const { name, email, type, results, sgScores, ennScores } = data

  let fields

  // set up create function
  const createPerson = async () => {
    const createPer = await fetch(
      `https://api.planningcenteronline.com/people/v2/people`,
      {
        method: "POST",
        headers: {
          ...headers,
        },
        body: JSON.stringify(person),
      }
    )
    // convert results to json
    const returnedPerson = await createPer.json()

    // once the person is created then an email can be assigned to them
    const assignEmail = await fetch(returnedPerson.data.links.emails, {
      method: "POST",
      headers: {
        ...headers,
      },
      body: JSON.stringify(emailData),
    })

    // convert results to json
    const returnedEmail = await assignEmail.json()
    return returnedEmail.data.relationships.person.data.id
  }

  // define person data structure
  const person = {
    data: {
      attributes: {
        first_name: name.split(" ")[0],
        last_name: name.split(" ")[1],
      },
    },
  }

  const emailData = {
    data: {
      attributes: {
        address: email,
        location: "Home",
        primary: true,
      },
    },
  }

  // set up headers for later use
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        "9eab0c2fafa96d27767b2aa59e4bf576dd8b50402101565661d530acff58a876" +
          ":" +
          "ad5f195574c2cb04033642f30f9da9869395208d9b7fcb52acab89a458546249"
      ).toString("base64"),
    Connection: "keep-alive",
    "Content-Type": "application/json",
  }

  // set up data to update in PCO
  if (type === "Myers-Briggs") {
    fields = [
      { id: 433567, value: results[0].scores[0] },
      { id: 433568, value: results[0].scores[1] },
      { id: 433569, value: results[1].scores[0] },
      { id: 433570, value: results[1].scores[1] },
      { id: 433574, value: results[2].scores[0] },
      { id: 433575, value: results[2].scores[1] },
      { id: 433576, value: results[3].scores[0] },
      { id: 433577, value: results[3].scores[1] },
      {
        id: 434386,
        value: results
          .map(i => i.win)
          .toString()
          .replace(/,/g, ""),
      },
    ]
  } else if (type === "Spiritual Gifts") {
    // set up the "top gifts" checkboxes
    const topGifts = results.map(result => ({ id: 434346, value: result.gift }))

    // get all the person's top gifts from pco to get their field ids
    let promises = await Promise.all(
      sgScores.map(result =>
        fetch(
          `https://api.planningcenteronline.com/people/v2/field_definitions?where[name]=${result.name}`,
          {
            headers: {
              ...headers,
            },
          }
        )
      )
    )

    // process the results
    promises = await Promise.all(promises.map(promise => promise.json()))

    // pull the fields out for easier processing
    const fieldDefs = promises.map(promise => promise.data[0])

    //
    const giftIds = sgScores.map(score => {
      const match = fieldDefs.find(def => score.name === def.attributes.name)
      return {
        id: match.id,
        value: Math.ceil((score.score / 15) * 100),
      }
    })
    fields = topGifts.concat(giftIds)
  } else if (type === "Enneagram") {
    const topScores = results.map(result => ({
      id: 434528,
      value: `Type ${result + 1}`,
    }))

    fields = topScores.concat([
      { id: 434372, value: ennScores[0] },
      { id: 434373, value: ennScores[1] },
      { id: 434374, value: ennScores[2] },
      { id: 434375, value: ennScores[3] },
      { id: 434376, value: ennScores[4] },
      { id: 434377, value: ennScores[5] },
      { id: 434378, value: ennScores[6] },
      { id: 434379, value: ennScores[7] },
      { id: 434380, value: ennScores[8] },
    ])
  }

  let personId = undefined

  // search for the person
  const personSearch = await fetch(
    `https://api.planningcenteronline.com/people/v2/people?where[search_name_or_email]=${email}`,
    {
      headers: {
        ...headers,
      },
    }
  )

  // process search results
  const searchResult = await personSearch.json()

  // determine if anyone exists in the database & assign the id to them if so
  if (searchResult.meta.total_count === 1) {
    personId = searchResult.data[0].id
  } else if (searchResult.meta.total_count > 1) {
    // i need to loop through the results & find someone with the same name
    const filtered = searchResult.data.filter(
      person => person.attributes.name.toUpperCase() === name.toUpperCase()
    )
    if (filtered.length === 1) {
      personId = filtered[0].id
    }
  }

  // if nobody exists then create a person
  if (personId === undefined) {
    personId = await createPerson()
  }

  // get the person (either created or found) in PCO
  const getPerson = await fetch(
    `https://api.planningcenteronline.com/people/v2/people/${personId}?include=field_data
`,
    {
      headers: {
        ...headers,
      },
    }
  )

  // process the raw data into useable json
  const personData = await getPerson.json()

  // go item by item through the fields and test each one against the existing data.
  // anywhere there's a match put it in an array to delete
  // make sure all entries are unique by creating a set
  const toDelete = new Set(
    fields
      .map(field =>
        personData.included.filter(
          data => field.id == data.relationships.field_definition.data.id
        )
      )
      .flat()
  )

  // const

  await Promise.all(
    [...toDelete].map(i =>
      fetch(i.links.self, {
        method: "DELETE",
        headers: {
          ...headers,
        },
      })
    )
  )

  await Promise.all(
    fields.map(field =>
      fetch(personData.data.links.field_data, {
        method: "POST",
        headers: {
          ...headers,
        },
        body: JSON.stringify({
          data: {
            attributes: { value: field.value },
            relationships: { field_definition: { data: { id: field.id } } },
          },
        }),
      })
    )
  )

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "I'm Done",
      personId: personId || "undefined",
      personData: personData,
    }),
  }
}
