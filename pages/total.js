import { useCallback, useEffect } from "react";
import { formatearDinero } from "../helpers";
import useKiosco from "../hooks/useKiosco";
import Layout from "../layout/Layout";

export default function Total() {
	const { pedido, nombre, setNombre, colocarOrden, total } =
		useKiosco();

	const comprobarPedido = useCallback(() => {
		return pedido.length === 0 || nombre.length < 3;
	}, [pedido, nombre]);

	useEffect(() => {
		comprobarPedido();
	}, [pedido, comprobarPedido]);

	return (
		<Layout pagina="Confirmar Pedido">
			<h1 className="text-4xl font-black">Total</h1>
			<p className="text-2xl my-10">Confirma tu Pedido</p>

			<form onSubmit={colocarOrden}>
				<div>
					<label className="block uppercase text-slate-800 font-bold text-xl">
						Nombre
					</label>
					<input
						type="text"
						className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded-md"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>
				<div className="mt-10">
					<p className="text-2xl">
						Total a pagar{" "}
						<span className="font-bold">
							{formatearDinero(total)}
						</span>
					</p>
				</div>
				<div className="mt-5">
					<input
						type="submit"
						className={`${
							comprobarPedido()
								? "bg-indigo-100"
								: "bg-indigo-600 hover:bg-indigo-800 cursor-pointer"
						}  w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
						value="Confirmar Pedido"
						disabled={comprobarPedido()}
					/>
				</div>
			</form>
		</Layout>
	);
}
