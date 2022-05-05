import { NodemailerAdapter } from "../adapters/nodemailer-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private nodemailerAdapter: NodemailerAdapter
  ){}

  async execute(request: SubmitFeedbackUseCaseRequest ){
    const { type, comment, screenshot } = request

    if(!type){
      throw new Error('Type is required')
    }

    if(!comment){
      throw new Error('Comment is required')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format')
    }

    await this.feedbacksRepository.create({type, comment, screenshot})
    await this.nodemailerAdapter.sendMail({
        subject: 'Novo Feedback',
        body: [
          `<div style="font-family: sans-serif; font-size:16px; color:#111">`,
          `<p>Tipo do feedback: ${type}`,
          `<p>Comentário: ${comment}`,
          `</div>`,
        ].join('')
      }
    )

  }
}