import pool from '../../config.js'
import format from 'pg-format'

export const getJoyasModel = async ({ orderBy = 'stock_ASC', limit = 3, page = 1 }) => {
    const [campo, direccion] = orderBy.split('_')
    const offset = (page - 1) * limit
    const formatQuery = format(
        'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
        campo,
        direccion,
        limit,
        offset
    )
    const response = await pool.query(formatQuery)
    return response.rows
}

export const getJoyasPorFiltros = async ({ precio_min, precio_max, categoria, metal }) => {
    let filtros = []
    const values = []

    const agregarFiltro = (campo, comparador, valor) => {
        values.push(valor)
        filtros.push(`${campo} ${comparador} $${values.length}`)
    }

    if (precio_max) agregarFiltro('precio', '<=', precio_max)
    if (precio_min) agregarFiltro('precio', '>=', precio_min)
    if (categoria) agregarFiltro('categoria', '=', categoria)
    if (metal) agregarFiltro('metal', '=', metal)

    let consulta = "SELECT * FROM inventario"
    if (filtros.length > 0) {
        consulta += ` WHERE ${filtros.join(" AND ")}`
    }

    const { rows: joyas } = await pool.query(consulta, values)
    return joyas
}

export const prepararHATEOAS = (inventario) => {
    const results = inventario.map((m) => {
        return {
            nombre: m.nombre,
            href: `http://localhost:5000/joyas/joya/${m.id}`
        }
    }).slice(0, 6)
    const total = inventario.length
    const HATEOAS = {
        total,
        results
    }
    return HATEOAS
}

// DE otra forma
/* export const prepararHATEOAS = (inventario) => {
    const results = inventario.map((m) => {
        return {
            nombre: m.nombre,
            href: `http://localhost:5000/joyas/joya/${m.id}`,
        }
    }).slice(0, 6)
    const total = inventario.length
    const HATEOAS = {
        total,
        results
    }
    return HATEOAS
} */

/* export const getJoyasHATEOASModel = async () => {
    const inventario = await pool.query('SELECT * FROM inventario')
    return inventario.rows
} */