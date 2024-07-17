import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../contexts/cartContext';
import Cabecalho from './cabecalho.jsx';

function DetalheItemCarrinho() {
    const { itemId } = useParams();
    const { cartItems } = useContext(CartContext);
    const item = cartItems.find(item => item.id === itemId);

    if (!item) {
        return <div>Item não encontrado.</div>;
    }

    return (
        <>
            <Cabecalho />
            <div className="container mx-auto mt-8">
                <Link to="/" className="text-blue-500 hover:underline mb-4">
                    Voltar para o carrinho
                </Link>

                <div className="bg-white rounded-lg shadow p-4">
                    <h1 className="text-2xl font-semibold mb-4">Detalhes do Item</h1>
                    <div className="flex">
                        <img src={item.imagem} alt={item.tipoProduto} className="w-48 h-48 object-cover mr-4" />
                        <div className="grid gap-2"> {/* Use grid para organizar em linhas */}
                            <p className="text-lg font-medium">{item.tipoProduto}</p>
                            {item.cor && <p>Cor: {item.cor}</p>}
                            <p>Quantidade: {item.quantidade}</p>
                            <p>Preço Unitário: R$ {(item.precoTotal / item.quantidade).toFixed(2)}</p>
                            <p className="text-lg font-semibold">Preço Total: R$ {item.precoTotal.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetalheItemCarrinho;