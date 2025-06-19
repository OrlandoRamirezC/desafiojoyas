// Funcion no utilizada
const HATEOAS = async (entidad, data) => {
    const resultados = data.map((i) => {
        return {
            nombre: i.nombre,
            links: [
                {
                    href:`http://localhost:5000/${entidad}/${i.id}`
                }
            ]
        }
    }).slice(0, 6)
    console.log(resultados)
    const total = data.lenght
    const dataConHATEOAS = {
        total,
        results
    }
    console.log(dataConHATEOAS)
    return dataConHATEOAS
}

export default HATEOAS