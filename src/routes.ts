import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerAdapter } from './adapters/nodemailer-adapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req,res) => {
  const { type, comment, screenshot } = req.body
  
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    new PrismaFeedbacksRepository(),
    new NodemailerAdapter()
  )

  await submitFeedbackUseCase.execute({
    type, comment, screenshot
  })
 
   return res.status(201).json('Salvo com sucesso')
 })