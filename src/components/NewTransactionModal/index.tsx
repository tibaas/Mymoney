import * as Dialog  from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransationType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";


type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})



export function NewTransactionModal() {
    const { register, handleSubmit } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema)
    })

    function handleCreateNewTransaction(data: NewTransactionFormInputs) {
       console.log(data) 
    }

    return(
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <Dialog.Title> Nova Transação </Dialog.Title>
                <CloseButton>
                    <X  size={24}/>
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                    type="text" 
                    placeholder="Descrição" 
                    required 
                    {...register('description')}
                    />

                    <input 
                    type="number" 
                    placeholder="Preço" 
                    required 
                    {...register('price', { valueAsNumber: true })}
                    />

                    <input 
                    type="text" 
                    placeholder="Categoria" 
                    required 
                    {...register('category')}
                    />

                    <TransationType>
                        <TransactionTypeButton variant="income" value="income">
                            <ArrowCircleUp size={24} />
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton variant="outcome" value="outcome">
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