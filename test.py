import tkinter as tk
from tkinter import *
from tkinter import messagebox
def on_button_click():
    label3 = tk.Label(window,text="button clicked")
    label3.grid(column=3,row=6)
window = tk.Tk() #create new window
window.title("hello") #set a title to the interafec
window.geometry("900x900") #set the interface size can be changed
window.resizable(False,False) #disable the resizing of the window
label = tk.Label(window,text ="hello every one to my first interface in python",font="bold,12") # add a label to the window and set its font
label.grid(column=3,row=0) #exact place of the label
button = tk.Button(window,text="click me",command=on_button_click, bg="red")
button.grid(column=0,row=2) #important to display the window elements
menubar = Menu(window) #create a menu
file = Menu(menubar, tearoff = 0)  #create a menu item
menubar.add_cascade(label ='File', menu = file)  #add menu item to the menu and under the menu yo should add options
doc = Menu(menubar, tearoff = 0) 
menubar.add_cascade(label ='doc', menu = doc) 
tools = Menu(menubar, tearoff = 0) 
menubar.add_cascade(label ='tools', menu = tools) 
help = Menu(menubar, tearoff = 0) 
menubar.add_cascade(label ='help', menu = help) 
window.config(menu = menubar) 
messagebox.showwarning("error", "you should study well") # create a warning message box
window.configure(bg='blue') #set a background color to the window
window.mainloop() #open the window