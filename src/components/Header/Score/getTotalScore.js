export default function getTotalScore(types, criteria, partialPoints) {
  let sum = 0;

  types.forEach((item) => {
    // console.log(partialPoints.find((partialPoint)=>+partialPoint.id === +item.id))
    if (item.type === 1) {
      sum += partialPoints.find((partialPoint) => partialPoint.id === item.id)?.value || Math.floor(criteria.find((criteriaItem) => criteriaItem.id === item.id)?.max / 2)
    }
    if (item.type === 2) {
      sum += criteria.find((criteriaItem) => criteriaItem.id === item.id)?.max
    }
  })

  return sum;
}