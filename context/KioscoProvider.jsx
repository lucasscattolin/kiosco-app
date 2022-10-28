import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const KioscoContext = createContext();

const KioscoProvider = ({ children }) => {
	const [categorias, setCategorias] = useState([]);
	const [categoriaActual, setCategoriaActual] = useState({});
	const [producto, setProducto] = useState({});
	const [modal, setModal] = useState(false);
	const [pedido, setPedido] = useState([]);
	const [nombre, setNombre] = useState("");
	const [total, setTotal] = useState(0);

	const router = useRouter();

	const obtenerCategorias = async () => {
		const { data } = await axios("/api/categorias");
		setCategorias(data);
	};

	useEffect(() => {
		obtenerCategorias();
	}, []);

	useEffect(() => {
		setCategoriaActual(categorias[0]);
	}, [categorias]);

	useEffect(() => {
		const nuevoTotal = pedido.reduce(
			(total, producto) =>
				producto.precio * producto.cantidad + total,
			0
		);

		setTotal(nuevoTotal);
	}, [pedido]);

	const handleClickCategoria = (id) => {
		const categoria = categorias.filter((cat) => cat.id === id);
		setCategoriaActual(categoria[0]);
		router.push("/");
	};

	const handleSetProducto = (producto) => {
		setProducto(producto);
	};

	const handleChangeModal = () => {
		setModal(!modal);
	};

	const handleAgregarPedido = ({ categoriaID, ...producto }) => {
		if (
			pedido.some((productoState) => productoState.id === producto.id)
		) {
			// Actualizar cantidad

			const pedidoActualizado = pedido.map((productoState) =>
				productoState.id === producto.id ? producto : productoState
			);
			setPedido(pedidoActualizado);
			toast.success("Pedido actualizado");
		} else {
			setPedido([...pedido, producto]);
			toast.success("Agregado al pedido");
		}

		setModal(false);
	};

	const handleEditarCantidades = (id) => {
		const productoActualizar = pedido.filter(
			(producto) => producto.id === id
		);
		setProducto(productoActualizar[0]);

		setModal(!modal);
	};

	const handleEliminarProducto = (id) => {
		const pedidoActualizado = pedido.filter(
			(producto) => producto.id !== id
		);
		setPedido(pedidoActualizado);
	};

	const colocarOrden = async (e) => {
		e.preventDefault();

		try {
			await axios.post("/api/ordenes", {
				pedido,
				nombre,
				total,
				fecha: Date.now().toString(),
			});

			//Resetear APP
			setCategoriaActual(categorias[0]);
			setPedido([]);
			setNombre("");
			setTotal(0);

			toast.success("¡Pedido realizado con éxito!");

			setTimeout(() => {
				router.push("/");
			}, 2000);
		} catch (error) {
			console.error(error);
		}
		console.log(pedido);
		console.log(nombre);
		console.log(total);
	};

	return (
		<KioscoContext.Provider
			value={{
				categorias,
				categoriaActual,
				handleClickCategoria,
				producto,
				handleSetProducto,
				handleChangeModal,
				modal,
				handleAgregarPedido,
				pedido,
				handleEditarCantidades,
				handleEliminarProducto,
				nombre,
				setNombre,
				colocarOrden,
				total,
			}}
		>
			{children}
		</KioscoContext.Provider>
	);
};

export { KioscoProvider };

export default KioscoContext;
