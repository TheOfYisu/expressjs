import { pool } from "../db.js";

export const getInventario= async (req, res) => {
    try{
        const [rows] = await pool.query ('SELECT * FROM inventario')
        res.json(rows);
    }catch (error){
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}
export const getProducto = async(req, res) => {
    try{
        console.log (req.params.Id)
        const [rows]= await pool.query('SELECT * FROM inventario WHERE id= ?', [req.params.id])
        if (rows.length <= 0) return res.status(404).json({
            message: 'Producto no encontrado'
        })
        res.json (rows[0])
    }catch (error){
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}

export const createProducto= async (req, res) => {
    const {Precio, Modelo, Color, Descripción } =req.body
    try{
        const [rows] = await pool.query('INSERT INTO inventario(Precio, Modelo, Color, Descripción) VALUES(?,?,?,?)', [Precio, Modelo, Color, Descripción]);
        res.send ({
            id: rows.insertId,
            Precio,
            Modelo,
            Color,
            Descripción
        })

    }catch (error) {
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}

export const deleteProducto= async (req, res) => {
    try{
        const [resuld] = await pool.query ('DELETE FROM inventario WHERE id=?', [req.params.id])
        
        if (resuld.affectedRows <= 0) return res.status(404).json({
            message: 'Producto no Encontrado'
        })
        res.sendStatus(204)

    }catch (error) {
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}

export const updateProducto= async (req, res) => {
    const {id}= req.params
    const {Precio, Modelo, Color, Descripción } =req.body
   
    try{
        const [resuld]= await pool.query( 'UPDATE inventario SET Precio = IFNULL(?, Precio), Modelo= IFNULL(?,Modelo), Color= IFNULL(?,Color), Descripción= IFNULL(?,Descripción) WHERE id = ?', [Precio,Modelo, Color, Descripción, id])
        console.log(resuld)
    
        if (resuld.affectedRows ===0) return res.status(404).json ({
            message: 'Producto no Encontrado'
        })
        const [rows]= await pool.query ('SELECT * FROM inventario WHERE id = ?', [id])
        res.json(rows[0])
        
    }catch (error) {
        return res.status(500).json ({
            message: 'Algo salio mal'
        })
    }

}
