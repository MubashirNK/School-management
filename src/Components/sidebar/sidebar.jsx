import React ,  { useState } from 'react';
import { Button, Drawer, DrawerBody, DrawerContent,DrawerOverlay, } from "@chakra-ui/react";
import { CiCircleRemove } from "react-icons/ci";
import { AlignJustify } from 'lucide-react';
import { Outlet ,Link} from 'react-router-dom';

function Sidemenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState('left');

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
    <div className='bg-slate-400'>
        <Button  variant={'none'} className='  md:text-white text-text text-xl font-bold mb-4 flex items-center gap-2 pt-5' onClick={onOpen}>
          <AlignJustify className='right-5 space-x-3 border-s-dark-wine w-6 h-6' /><span className='font-medium md:text-white text-text text-2xl'>ABC School</span>
        </Button>

        <Drawer  placement={placement} isOpen={isOpen} onClose={onClose} >
          <DrawerOverlay  />
          <DrawerContent className='h-fit'>
            <DrawerBody className="bg-black   border border-black border-opacity-10 w-[20rem]   p-4">
              
              <CiCircleRemove   className='size-7 text-white mb-2  '  onClick={onClose} />
                <ul className='grid items-center'>
               <Link to="/admin"> <li className="text-white cursor-pointer text-lg py-4 hover:bg-purple-500 hover:bg-opacity-20 hover:rounded-lg px-2 rounded border-b"> Admin</li> </Link>  <br />
               <Link to="/Officestaff">  <li className="text-white cursor-pointer text-lg py-4 hover:bg-purple-500 hover:bg-opacity-20 hover:rounded-lg px-2 rounded border-b">Office</li> </Link><br />
    
                <Link to="/librarian"> <li className="text-white cursor-pointer text-lg py-4 hover:bg-purple-500 hover:bg-opacity-20 hover:rounded-lg px-2 rounded border-b">Library</li><br /></Link>
                </ul>
            
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    </div>
<Outlet/>
    </>
  );
}

export default Sidemenu;