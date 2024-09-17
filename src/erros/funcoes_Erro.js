export default function Tratar_Erros ( erro )
{
	if ( erro.code === "ENOENT" )
		throw new Error ( "Arquivo não encontrado" );

	else
		return "Erro na aplicação";
}
