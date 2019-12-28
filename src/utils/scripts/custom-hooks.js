export const useCenterColumns = arr => {
  const length = arr.length
  const colSizes = arr.map(() => ({ md: "6", lg: "4" }))

  // Center the last item on medium screens if array length is odd
  if (length % 2 === 1) {
    colSizes[length - 1] = {
      md: { size: 6, offset: 3 },
      lg: { size: 4, offset: 0 },
    }
  }

  // Center last two items on large screens if there are only two items left
  if (length % 3 === 2) {
    colSizes[length - 2].lg = { size: 4, offset: 2 }
  }
  return colSizes
}

export const useRemovePastItems = arr => {
  const now = new Date()

  let activeItems = []

  arr.forEach(event => {
    let itemDate = new Date(event.start)
    itemDate.setDate(itemDate.getDate() + 1)
    if (itemDate > now) activeItems.push(event)
  })

  return activeItems
}
