'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

interface ComboboxProps {
    value: string;
    onChange: (value: string) => void;
}

const plantCategories = [
    { value: '-', label: 'None' },
    { value: 'indoor', label: 'Indoor' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'Succulent', label: 'Succulent' },
    { value: 'flowering', label: 'Flowering' },
    { value: 'herb', label: 'Herb' },
    { value: 'fern', label: 'Fern' },
    { value: 'tree', label: 'Tree' },
    { value: 'shrub', label: 'Shrub' },
];

export function ComboBox({ value, onChange }: ComboboxProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                >
                    {value ? value : 'Select category...'}
                    <ChevronsUpDown className='opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput
                        placeholder='Search category...'
                        className='h-9'
                    />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {plantCategories.map((cat) => (
                                <CommandItem
                                    key={cat.value}
                                    value={cat.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {cat.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === cat.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
