function Filtrar_Ocorrencias ( paragrafo )
{
	return Object.keys ( paragrafo ).filter ( chave => paragrafo [ chave ] > 1 )
}

function Montar_Saida_Arquivo ( lista_palavras )
{
	let texto_Final = "";
	lista_palavras.forEach (( paragrafo, indice ) =>
	{
		const duplicadas = Filtrar_Ocorrencias ( paragrafo ).join ( ' ,' );
		texto_Final += `Palavras duplicadas no parágrafo ${indice + 1}: ${duplicadas} \n`
	})

	return texto_Final;
}

export { Montar_Saida_Arquivo };
