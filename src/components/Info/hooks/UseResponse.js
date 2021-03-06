export default function UseResponse(score, comments, wrongCriteria, partialCriteria, correctCriteria, partialPoints) {
  let response = '';

  response += `Ваша отметка - ${score} балла(ов)\n`
  response += "Отзыв по пунктам ТЗ:\n"
  if (wrongCriteria.length) {
    response += "Не выполненные/не засчитанные пункты:\n"
  }
  wrongCriteria.forEach((wrong, index) => {
    response += `${index + 1}) ${wrong.text}\n`
    const commentForCriteria = comments.find((comment) => comment.id === wrong.id)?.value
    if (commentForCriteria) {
      response += `Комментарий проверяющего: ${commentForCriteria}\n`
    }
  })
  if (partialCriteria.length) {
    response += "\nЧастично выполненные пункты:\n"
  }
  partialCriteria.forEach((partial, index) => {
    response += `${index + 1}) ${partial.text} — `
    response += `${partialPoints.find((partialPoint) => partial.id === partialPoint.id)?.value || Math.floor(partial.max / 2)} балл(а)\n`

    const commentForCriteria = comments.find((comment) => comment.id === partial.id)?.value
    if (commentForCriteria) {
      response += `Комментарий проверяющего: ${commentForCriteria}\n`
    }
  })

  if (correctCriteria.filter((correct) =>
    !!comments.find((comment) => comment.id === correct.id)?.value
  ).length) {
    response += "\n\nКомментарии к выполненным пунктам:\n\n"
  }

  let commentId = 1;
  correctCriteria.forEach((correct) => {
    const commentForCriteria = comments.find((comment) => comment.id === correct.id)?.value
    if (commentForCriteria) {
      response += `${commentId}) ${correct.text}\n`

      response += `Комментарий проверяющего: ${commentForCriteria}\n`
      commentId++;
    }
  })

  if (wrongCriteria.length === 0 && partialCriteria.length === 0) {
    response += "\n\nВсе пункты выполнены полностью!\n"
  } else {
    response += "\n\nВсе оставшиеся пункты выполнены и не имеют комментариев проверяющего.\n"
  }

  return response
}