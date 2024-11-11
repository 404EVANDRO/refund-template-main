//select elements from form  
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//select the elementos from the list

const expenseList = document.querySelector("ul")

//capture input event to format the value 
amount.oninput = () => {
    
    //get the actualy value of input and remove the non-numeric characters
    let value = amount.value.replace(/\D/g, "")

    //transform the value in cents.
    value = Number(value) / 100
    
    //Update input value 
    amount.value = formatCurrencyBRL(value) 

}

function formatCurrencyBRL(value) {
    //formata em BRL 
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    return value 
}

//catch the submit event from the form 
form.onsubmit = (event) => {
    event.preventDefault()

    //Creates a new object with the details of new expenditure
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value, 
        created_at: new Date()
    }
    console.log(newExpense)
}
//call the function for add the item on list
function expenseAdd(newExpense){
    try{
        //Creates the element li to add on list
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Creates the category icon
        const expenseIcon = document.createElement("img")
        expenseIcon = SetAttributte("src", `img/${newExpense.category_id}.svg`)
        expenseIcon = SetAttributte("alt", newExpense.category_name)

        expenseItem.append(expenseIcon)
        expenseList.append(expenseItem)

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
    
}



