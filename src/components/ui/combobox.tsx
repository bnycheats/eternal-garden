import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const popOverStyles = {
  width: 'var(--radix-popover-trigger-width)',
};

export function Combobox({
  value,
  onSelect,
  items,
  searchPlaceholder = 'Search item...',
  noResultsMsg = 'No Result.',
  selectItemMsg = 'Select an item',
  className,
  unselect = false,
  unselectMsg = 'None',
  onSearchChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleOnSearchChange = useDebouncedCallback((e: string) => {
    if (e === '') {
      return;
    }

    if (onSearchChange) {
      onSearchChange(e);
    }
  }, 300);

  const renderSelectedItem = () => {
    if (value) {
      const find = items.find((item) => item.value === value);

      if (find) return find.label;

      return selectItemMsg;
    }
    return selectItemMsg;
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn('justify-between', className)}>
          {renderSelectedItem()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent style={popOverStyles} className="popover-content-width-same-as-its-trigger p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} onValueChange={handleOnSearchChange} />
          <div className="max-h-[220px] overflow-auto">
            <CommandEmpty>{noResultsMsg}</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {unselect && (
                  <CommandItem
                    key="unselect"
                    value=""
                    onSelect={() => {
                      onSelect('');
                      setOpen(false);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', value === '' ? 'opacity-100' : 'opacity-0')} />
                    {unselectMsg}
                  </CommandItem>
                )}
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={(currentValue) => {
                      onSelect(currentValue === item.label ? item.value : '');
                      setOpen(false);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')} />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export type ComboBoxItemType = {
  value: string;
  label: string;
};

type ComboboxProps = {
  value?: string;
  onSelect: (value: string | undefined) => void;
  items: ComboBoxItemType[];
  searchPlaceholder?: string;
  noResultsMsg?: string;
  selectItemMsg?: string;
  className?: string;
  unselect?: boolean;
  unselectMsg?: string;
  onSearchChange?: (e: string) => void;
};
