import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import Logo from "../LOGO PROVISOIRE FRENCH AROUND THE WORLD.png"

const navigation = [
  { name: 'HOME', href: '#', current: true },
  { name: 'COURSES', href: '#', current: false },
  { name: 'PRICING', href: '#', current: false },
  { name: 'ABOUT', href: '#', current: false },
  { name: 'CONTACT', href: '#', current: false },
  { name: 'FAQ', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function Example() {
  return (
  <div className='flex h-[130px] justify-center'>
   <ul className='flex space-x-24 items-center font-medium'>
   <li>HOME</li>
   <li>COURSES</li>
   <li>PRICING</li>
   <li>ABOUT</li>
   <li>CONTACT</li>
   <li>FAQ</li>
   </ul>
   </div>
  )
}