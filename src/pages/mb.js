import React from "react"
import { mbtiQuestions } from "../utils/data/assessments"

const mb = () => {
  const stacks = [[], [], [], []]

  // mbtiQuestions.sort((a, b) => a.type.localeCompare(b.type))

  mbtiQuestions.forEach(question => {
    if (question.type === "E/I") stacks[0].push(question)
    if (question.type === "S/N") stacks[1].push(question)
    if (question.type === "T/F") stacks[2].push(question)
    if (question.type === "J/P") stacks[3].push(question)
  })

  return (
    <div style={{ marginTop: "10em" }}>
      {/* ORDERED IN SECTIONS */}
      <div style={{ marginTop: "10em" }}>
        {stacks.map((stack, i) => {
          return (
            <>
              <h2>{`Section ${i + 1}`}</h2>
              <table>
                <th>Question</th>
                <th>0</th>
                <th>1</th>

                {stack.map((question, i) => {
                  const number = i + 1
                  const capitalized = question.options.map(
                    option =>
                      option[0].charAt(0).toUpperCase() + option.slice(1)
                  )
                  return (
                    <tr>
                      <td
                        style={{ paddingRight: "36px" }}
                      >{`${number}. ${question.question}`}</td>

                      <td style={{ paddingRight: "36px" }}>{capitalized[0]}</td>
                      <td>{capitalized[1]}</td>
                    </tr>
                  )
                })}
              </table>
            </>
          )
        })}
      </div>

      <hr style={{ color: "black" }} />
      {/* UNORDERED STRAIGHT THROUGH */}
      <div style={{ marginTop: "10em" }}>
        <ol>
          {mbtiQuestions.map((question, i) => {
            const capitalized = question.options.map(
              option => option[0].charAt(0).toUpperCase() + option.slice(1)
            )
            return (
              <div style={{ marginBottom: "2em" }}>
                <li>{question.question}</li>
                <ul style={{ listStyleType: "none" }}>
                  <li>{`(0) ${capitalized[0]}`}</li>
                  <li>{`(1) ${capitalized[1]}`}</li>
                </ul>
              </div>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default mb
