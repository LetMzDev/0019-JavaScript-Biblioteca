//  CLI é a sigla para Command Line Interface ( Interface de Linha de Comando )
// node .\cli.js -t ../arquivos/texto-web.txt -d ../resultados/

import fs from 'fs';
import path from 'path';

import Tratar_Erros from './erros/funcoes_Erro.js';
import { Contar_Palavras } from './index.js';
import { Montar_Saida_Arquivo } from './helpers.js';

import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command (); // Criando uma instância da biblioteca

program
	.version ( '0.0.1' )
	.option ( '-t, --texto <string>', 'Caminho do texto a ser processado' )
	.option ( '-d, --destino <string>', 'Caminho da pasta onde salvar o arquivo de resultados' )
	.action (( options ) =>
	{
		const { texto, destino } = options; // Destruturação ( duas variáveis distintas )

		if ( !texto || !destino )
		{
			console.erro ( chalk.red ( "Erro, por favor inserir caminho de origem e destino" ));
			program.help;
			return;
		}

		const caminho_Texto = path.resolve ( texto );
		const caminho_Destino = path.resolve ( destino );

		try
		{
			Processar_Arquivo ( caminho_Texto, caminho_Destino );
			console.log ( chalk.green ( "Texto processado com sucesso." ));
		}

		catch ( erro )
		{
			console.log ( "Ocorreu um erro no processamento.", erro );
		}
	})

program.parse();

// const caminho_Arquivo = process.argv;
// const link = caminho_Arquivo [ 2 ];
// const endereco = caminho_Arquivo [ 3 ];

function Processar_Arquivo (texto, destino )
{
	fs.readFile ( texto, 'utf-8', ( erro, texto ) =>
	{
		try
		{
			if ( erro )
				throw erro

			const resultado = Contar_Palavras ( texto );
			Criar_Salvar_Arquivo ( resultado, destino );
		}
		catch ( erro )
		{
			Tratar_Erros ( erro );
		}
	})
}

async function Criar_Salvar_Arquivo ( lista_palavras, endereco )
{
	const novo_Arquivo = `${endereco}/resultado.txt`;
	const texto_Palavras = Montar_Saida_Arquivo ( lista_palavras );

	try
	{
		await fs.promises.writeFile ( novo_Arquivo, texto_Palavras );
		console.log ( "Arquivo criado" );
	}
	catch ( erro )
	{
		throw erro;
	}
}

/*
function Criar_Salvar_Arquivo ( lista_palavras, endereco )
{
	const novo_Arquivo = `${endereco}/resultado.txt`;
	const texto_Palavras = JSON.stringify ( lista_palavras );

	fs.promises.writeFile ( novo_Arquivo, texto_Palavras )
		.then (() =>
		{
			// Processamento feito com o resultado da promessa
			console.log ( "arquivo criado" );
		})
		.catch (( erro ) =>
		{
			throw erro;
		})
		.finally (() =>
		{
			console.log ( "Operação finalizada" );
		})
}
*/