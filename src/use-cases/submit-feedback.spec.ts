import { SubmitFeedbackUseCase } from './submit-feedback'

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy}
)

describe('Submit feedbak', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64ẃoubef3ebisudbpfiasdf'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should be not possible send a feedback without type', async() => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64ẃoubef3ebisudbpfiasdf'
    })).rejects.toThrow()

    expect(createFeedbackSpy).not.toHaveBeenCalled()
    expect(sendMailSpy).not.toHaveBeenCalled()
  })

  it('should be not possible send a feedback without comment', async() => {
    await expect(submitFeedback.execute({
      type: 'IDEA',
      comment: '',
      screenshot: 'data:image/png;base64ẃoubef3ebisudbpfiasdf'
    })).rejects.toThrow()

    expect(createFeedbackSpy).not.toHaveBeenCalled()
    expect(sendMailSpy).not.toHaveBeenCalled()
  })

  it('should be not possible send a feedback with invalid screenshot format', async() => {
    await expect(submitFeedback.execute({
      type: 'IDEA',
      comment: 'comment comment',
      screenshot: 'test.jpg'
    })).rejects.toThrow()

    expect(createFeedbackSpy).not.toHaveBeenCalled()
    expect(sendMailSpy).not.toHaveBeenCalled()
  })
})