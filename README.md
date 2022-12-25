### Grosory App take user order

## Appliction breif 

We need an application taking the user inputs and make a list for Grocery items .

We need for Alert to display for add item , clear All items , edit item , remove item 

we have App > Alert > List
================================================

# part one :
Handle user input ...

[a] user input value is empty --> disply alert 
[b] user input value valid and need to edit it  --> disply alert
[c] user input value --> add it to list item

- create alert function and call it for above senarioes
- pass & desturcture alert object to Aleert component
- in Alert Component change class based on type of alert


# Part Two :
Display items list ...

- create newItem , it is an object
- generate unique id property  id = new Date().getTime().toString(), title:newItem
- Adding the newItem to the list [...by adding the old list , adding the new item ]
  [...list,newItem]

part Three:
Remove all item in list ...

- create clear function 


# part four:
Edite & delete specific item based on id

- using filter method to make test based one item id
remove function :   list.filter((item)=> item.id !== id) so we need to keep the item item.id not match id

edite function  : specificItem= list.find((item)=> item.id=id) so we search for item.id match it
                                                               then we setitemName(specificItem)
                                                               setIsEditing(true)
                                                               showAlert(true)


onSubmit  in case ( itemName = true && ItEdeting = true)   
--------------------------------------------------------------
itterate over list 
setList(
   list.map((item)=>{
      if (editeId === item.id)
      {
         return {...list , title:setItemName}
      }
      return item
   })
   )

setEditing(false)
setEditID(null)
setItemName('')
showAlert(true)


# part five 
LocalStorage ..

store our list item to localstorage by useEffect

useEffect(()=>{
localstorage.setitem('key' , value: string)

localstorage.setitem('key', JSON.stringfy(value))
                              |_Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
} ,[list])

before reneder our App

const getlocalstorage = ()=>{
   let list = localstorege.getitem('key)
   if (list)
   {
      return JSON.parse(localstorage.getItem('key'))
                  |_ Converts a JavaScript Object Notation (JSON) string into an object.
   }
}


















[1] Create LayOut 

section
   |
 form 
   |
   h3
   |
div for form-control
   |
input
button

[2] Setup some states 
 name for user input
 isEditing for editing flag
 editId 
 list for user input item to set/get item from LocalStorage
 alert for alert flag and it is object { show: '' , msg:'', type:''}


 [3] logic of submit

create newItem object = {id: new Date().getTime().toString() , title: }
adding that new item to list of items using array spreed operator to copy last list then adding the new item
setList([...list , newItem])

[4] passing list of items to </List> component where we can itterated over it to display items */}

[5] display grocery-container if List.length = 0

[6] handle Alert 
    - passing alert object to Alert component 
    - need only type , msg
    - change style for alert based on type of alert  alert-{type} 
    - if type= sucess then className= 'alert-sucess'
      if type= danger then className= 'alert-danger'






