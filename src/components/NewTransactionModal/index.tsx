import * as Dialog  from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransationType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { TransactionContext } from "../../contexts/TransactionsContext";
import { useContext } from 'react'


type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})



export function NewTransactionModal() {
    const { createTransaction } = useContext(TransactionContext)


    const { control, register, handleSubmit,reset , formState: { isSubmitting } } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        const { category, description, price, type } = data

        await createTransaction({
            description,
            price,
            category,
            type
        })
       
        reset()
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

                    <Controller  
                    control={control}
                    name="type"
                    render={({ field }) => {
                        return (
                            <TransationType onValueChange={field.onChange} value={field.value}>
                            <TransactionTypeButton variant="income" value="income">
                                <ArrowCircleUp size={24} />
                                Entrada
                            </TransactionTypeButton>
    
                            <TransactionTypeButton variant="outcome" value="outcome">
                                <ArrowCircleDown size={24} />
                                Saída
                            </TransactionTypeButton>
    
                        </TransationType>
                        )
                    }}
                    />

                    <button type="submit" disabled={isSubmitting}> Cadastrar </button>

                </form>

                
            </Content>
        </Dialog.Portal>
    )
} 