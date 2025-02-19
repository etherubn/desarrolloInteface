import { useState } from "react"

export const CalculoPrecio = () => {
    const initialValue = {
        precio: "",
        nombre: "",
        cantidad: "",
        total: 0
    }
    const [product, setproduct] = useState(initialValue)
    const { precio, nombre, cantidad, total } = product
    const [error, seterror] = useState({})

    const handleChange = ({ target }) => {
        const { value, name } = target

        if (name === 'nombre' && !value.length) {
            if (value.length === 0) {
                setproduct({
                    ...product,
                    [name]: ""
                })
            }
            seterror({
                ...error,
                nombre: "Ingrese nombre producto"
            })
            return
        }

        if (name === 'precio' || name === "cantidad") {

            if (parseFloat(value) <= 0) {
                console.log(value);

                seterror({
                    ...error,
                    [name]: "Precio no puede ser menor a 0 o igual"
                })
                return
            }

        }

        seterror({ ...error, [name]: "" })

        setproduct({
            ...product,
            [name]: value
        })
    }

    const handleClick = () => {
        setproduct(initialValue)
    }




    const calculoTotal = () => {
        if (precio && cantidad && nombre) {
            setproduct({
                ...product,
                total: precio * cantidad
            })
        }
    }



    return (
        <>
            <section className="d-flex justify-content-center flex-column align-items-center">
                <h1>Calculando precio</h1>
                <hr />
                <form className="d-flex flex-column gap-3">
                    <div className="d-flex gap-4 align-items-center justify-content-center justify-content-center">
                        <label className="col-2" htmlFor="nombre">Nombre</label>
                        <input className="form-control" value={nombre} onChange={handleChange} type="text" name="nombre" id="nombre" />
                        {error.nombre && <p style={{ color: 'red' }}>{error.nombre}</p>}
                    </div>
                    <div className="d-flex gap-4 align-items-center justify-content-center">
                        <label className="col-2" htmlFor="cantidad">Cantidad</label>
                        <input className="form-control" value={cantidad} onChange={handleChange} type="text" name="cantidad" id="cantidad" />
                        {error.cantidad && <p style={{ color: 'red' }}>{error.cantidad}</p>}
                    </div>
                    <div className="d-flex gap-4 align-items-center justify-content-center">
                        <label className="col-2" htmlFor="precio">precio</label>
                        <input className="form-control" value={precio} onChange={handleChange} type="text" name="precio" id="precio" />
                        {error.precio && <p style={{ color: 'red' }}>{error.precio}</p>}
                    </div>
                </form>

                {total ? <p>El total: {total} </p> : <p>Ingrese datos para calcular total</p>}
                <div className="d-flex justify-content-center gap-3">
                    <button disabled={!precio || !cantidad || !nombre} onClick={calculoTotal} className="btn btn-primary">Calcular total</button>
                    <button onClick={handleClick} className="btn btn-primary">Resetear Valores</button>
                </div>

            </section>
        </>
    )
}

