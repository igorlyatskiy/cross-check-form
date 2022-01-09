export default function UseCriteria(types, filteredCriteria) {
  const wrongInputs = types.filter((e) => e.type === 0);
  const wrongCriteria = filteredCriteria.filter((criteria) => wrongInputs.find((input) => input.id === criteria.id))

  const partialInputs = types.filter((e) => e.type === 1);
  const partialCriteria = filteredCriteria.filter((criteria) => partialInputs.find((input) => input.id === criteria.id))

  const correctInputs = types.filter((e) => e.type === 2);
  const correctCriteria = filteredCriteria.filter((criteria) => correctInputs.find((input) => input.id === criteria.id))

  return [wrongCriteria, partialCriteria, correctCriteria]
}