import { getJoyasModel, getJoyasPorFiltros, prepararHATEOAS } from "../models/joyasmodel.js"
//import HATEOAS from "./hateoas.js"

export const ruta = (req, res) => {
  res.status(404).send("Esta ruta no existe")
}

export const getPageJoyas = async (req, res) => {
  try {
    const { orderBy, limit, page } = req.query
    const inventario = await getJoyasModel({ orderBy, limit, page })
    const HATEOAS = await prepararHATEOAS(inventario)
    res.status(200).json(HATEOAS)
  } catch (error) {
    res.status(500).json(error)
    console.error('Error =>', error)
  }
}

export const getFiltroJoyas = async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query
    const inventario = await getJoyasPorFiltros({ precio_min, precio_max, categoria, metal })
    res.status(200).json({ inventario })
  } catch (error) {
    res.status(500).json(error)
    console.error('Error =>', error)
  }
}

// De otra forma
/* export const getJoyasHATEOAS = async (req, res) => {
  try {
    const allJoyas = await getJoyasHATEOASModel()
    const joyasConHateoas = await HATEOAS ('inventario', allJoyas)
    res.status(200).json({ joya: joyasConHateoas })
  } catch (error) {
   res.status(500).json({ error: error.message })
   console.log('Error al procesar la solicitud:'), error
  }
} */
