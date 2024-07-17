'use client';
import Select from "react-select";

import Textinput from "@/components/ui/Textinput";
// import Button from "@/components/Button";
import Button from "@/components/ui/Button";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Modal from 'react-modal';

export default function SellPage() {
    const [userInput, setUserInput] = useState({ name: '', email: '', phoneNumber: '', seller: '', release: '' });
    const [btnenabled, setBtnEnabled] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const { data: session } = useSession();
    const releases = [
        { value: "one", label: "Single" },
        { value: "four", label: "Quadruple" },
        // { value: "second", label: "Second Release" },
    ];

    const clearForm = () => {
        setUserInput({ name: '', email: '', phoneNumber: '', seller: '', release: '' });
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!userInput.release){
            setModalContent('Please Select a Release');
            setModalIsOpen(true);
            return;
        }
        if(!userInput.name){
            setModalContent('Please Enter a Name');
            setModalIsOpen(true);
            return;
        }
        if(!userInput.email){
            setModalContent('Please Enter an Email');
            setModalIsOpen(true);
            return;
        }
        if(!userInput.phoneNumber){
            setModalContent('Please Enter a Phone Number');
            setModalIsOpen(true);
            return;
        }
        
        setBtnEnabled(false);
        try {
            const res = await axios.post('/api/protected/sellreleaseklddali', userInput);
            console.log(res);
            setModalContent('Ticket Sold');
            setModalIsOpen(true);
            clearForm();
        } catch (error) {
            console.log(error);
            setModalContent('Ticket Not Sold');
            setModalIsOpen(true);
        } finally {
            setBtnEnabled(true);
        }
    }


    return (
        <div className='sm:rounded-5xl -mx-4 flex-auto  px-4 py-10 sm:mx-0 sm:flex-none sm:p-24'>
          <form onSubmit={handleSubmit} >
            <div className='space-y-2'>
                <Textinput
                id='BuyerName'
                name='BuyerName'
                type='text'
                label='Buyer Name'
                placeholder='John Smith'
                autoComplete='BuyerName'
                value = {userInput.name}
                onChange = {(e) => setUserInput({...userInput, name: e.target.value , seller: session?.user?.name})}
                required

                />
              <Textinput
                name="email"
                label="email"
                type="email"
                placeholder="email@example.com"
                autoComplete='email'
                value = {userInput.email}
                onChange = {(e) => setUserInput({...userInput, email: e.target.value})}
                />
              <Textinput
                id='PhoneNumber'
                name='PhoneNumber'
                type='tel'
                label='Phone Number'
                placeholder='20100100'
                autoComplete='tel'
                value = {userInput.phoneNumber}
                onChange = {(e) => setUserInput({...userInput, phoneNumber: e.target.value})}
                
              />
              
            <div>
                <label htmlFor="hh" className="form-label ">
                    Release
                </label>
                <Select
                className="react-select"
                classNamePrefix="select"
                // defaultValue={furits[0]}
                options={releases}
                id="hh"
                // value={userInput.fruit}
                onChange={(e) => {setUserInput({...userInput, release: e.value});
              }}
                />
            </div>
            </div>
            
            <Button
              type='submit'
            //   variant='outline'
            //   color='gray'
              className={` inline-flex items-center justify-center w-full px-4 py-2 mt-4 bg-primary-500 dark:bg-transparent text-white text-base font-medium  border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${!btnenabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!btnenabled}
            >
              SELL
            </Button>
          </form>
          <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Server Response Modal"
  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4 overflow-x-hidden overflow-y-auto bg-white rounded-lg shadow"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
  <div className="relative w-full max-h-full">
    <div className="relative bg-white rounded-lg shadow">
      <button
        type="button"
        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        onClick={closeModal}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
      <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-gray-900">{modalContent}</h3>
      </div>
    </div>
  </div>
</Modal>
        </div>
    )
}