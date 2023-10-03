import * as Dialog  from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransationType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";



export function NewTransactionModal() {
    return(
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <Dialog.Title> Nova Transação </Dialog.Title>
                <CloseButton>
                    <X  size={24}/>
                </CloseButton>

                <form action="">
                    <input type="text" placeholder="Descrição" required />
                    <input type="number" placeholder="Preço" required />
                    <input type="text" placeholder="Categoria" required />

                    <TransationType>
                        <TransactionTypeButton variant="Income" value="Income">
                            <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton variant="Outcome" value="Outcome">
                            <ArrowCircleDown size={24} />
                            Saída
                        </TransactionTypeButton>

                    </TransationType>

                    <button type="submit"> Cadastrar </button>

                </form>

                
            </Content>
        </Dialog.Portal>
    )
} 