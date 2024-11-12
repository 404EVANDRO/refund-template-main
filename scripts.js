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

    //Creates a new object with the details of new expense
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value, 
        created_at: new Date()
    }
    expenseAdd(newExpense)
}

//call the function for add the item on list
function expenseAdd(newExpense){
    try {
        //Creates the element li to add on list
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Creates the category icon
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)


        //create info for expese
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //create name of expense
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense
        
        //create category for expense
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //add name and category in div to informations of expense
        expenseInfo.append(expenseName, expenseCategory)

         //add the value of expanse
         const expenseAmount = document.createElement("span")
         expenseAmount.classList.add("expense-amount")
         expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
             .toUpperCase()
             .replace ("R$", "")}`


        //create remove icon 
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")
        

        //add the information on item 
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)


        //add the item on list
        expenseList.append(expenseItem)

        //att the totals
        updateTotals
        
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}

//atualiza os totais
function updateTotals(){
    try{
        //recovery li from the list (ul)
        const items = expenseList.children
        console.log(items)

    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais.")
    }
}




