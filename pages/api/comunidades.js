import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const client = new SiteClient(process.env.NEXT_PUBLIC_TOKEN_DATOCMS_WRITER);
        
        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
                                    itemType: "970247",
                                    ...request.body
                                })
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}