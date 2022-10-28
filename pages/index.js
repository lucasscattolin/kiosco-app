import Head from "next/head";
import Image from "next/image";
import Producto from "../components/Producto";
import useKiosco from "../hooks/useKiosco";
import Layout from "../layout/Layout";

export default function Home({}) {
	const { categoriaActual } = useKiosco();

	return (
		<Layout pagina={`Menu ${categoriaActual?.nombre}`}>
			<h1 className="text-4xl font-black">
				{categoriaActual?.nombre}
			</h1>
			<p className="text-2xl my-10">
				Elije y Personaliza tu pedido a continuación
			</p>

			<div className="grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
				{categoriaActual?.productos?.map((producto) => (
					<Producto key={producto.id} producto={producto} />
				))}
			</div>
		</Layout>
	);
}
