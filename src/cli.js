//  CLI é a sigla para Command Line Interface ( Interface de Linha de Comando )
import fs from 'fs';
import Tratar_Erros from './erros/funcoes_Erro.js';
import { Contar_Palavras } from './index.js';

// node .\cli.js ../arquivos/texto-web.txt

const caminho_Arquivo = process.argv;
const link = caminho_Arquivo [ 2 ];

fs.readFile ( link, 'utf-8', ( erro, texto ) =>
	{
		try
		{
			if ( erro )
				throw erro

			Contar_Palavras ( texto );
		}
		catch ( erro )
		{
			Tratar_Erros ( erro );
		}
	})