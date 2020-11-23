// index.js

import dotenv from 'dotenv';

dotenv.config();

import AWSConfig from './config/AWS.js';
import express from 'express';
import multConfig from './config/multer.js';
import multer from 'multer';
import find from './controller/find.js';
import deleteItem from './controller/deleteItem.js';

const app = express();

AWSConfig();

app.use(express.json());

app
	// Pegar arquivo
  .get('/', find)

	// Criar novos arquivos
  .post('/', multer(multConfig).single('file'), (req, res) => res.status(200).json({ response: req.file }))
  
	// Atualizar arquivo
  .put('/', multer(multConfig).single('file'), deleteItem)

	// Deletar arquivos
  .delete('/', deleteItem);

app.listen(3000);