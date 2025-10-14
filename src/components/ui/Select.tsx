// src/components/ui/Select.tsx
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Check, ChevronDown } from 'lucide-react'

interface SelectProps {
  label: string
  options: string[]
  selected: string
  onChange: (value: string) => void
}

export default function Select({
  label,
  options,
  selected,
  onChange,
}: SelectProps) {
  return (
    <div className="w-full md:w-48">
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          <Listbox.Label className="block text-sm font-medium text-center text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </Listbox.Label>
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-lg focus:outline-none focus-visible:border-green-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-md sm:text-sm border">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 lg:w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm sm:text-sm ">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-green-100 text-black dark:bg-gray-700 dark:text-white'
                        : 'text-gray-900 dark:text-gray-200'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-800 dark:text-green-200">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}