import type { FC } from 'react';
import { memo } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Slider } from '~/components/Slider/Slider';
import type { SelectOption } from '~/components/Select';
import { SelectTrigger, SelectValue, Select, SelectItem, SelectContent } from '~/components/Select';
import type { proto } from 'ts-igdb-client/proto/compiled';
import { SearchIcon } from 'lucide-react';
import type { GameSearchFormValues } from './formValues';
import { DEFAULT_FORM_VALUES } from './formValues';

interface Props {
  readonly formMethods: UseFormReturn<GameSearchFormValues>;
  readonly onSubmit: (data: GameSearchFormValues) => void;
}

const sortOptions: SelectOption<keyof proto.IGame>[] = [
  {
    label: 'By critics score',
    value: 'aggregated_rating',
  },
  {
    label: 'By name',
    value: 'name',
  },
  {
    label: 'By release date',
    value: 'first_release_date',
  },
];

const GameSearchFormComponent: FC<Props> = ({ formMethods, onSubmit }) => {
  const { register, handleSubmit, control } = formMethods;

  return (
    <form className="flex w-full gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Search game"
        {...register('name')}
      />
      <Controller
        name="releaseYear"
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <div className="flex w-full flex-col gap-1">
            <div>{rest.value.join('-')}</div>
            <Slider
              {...rest}
              onValueChange={onChange}
              min={DEFAULT_FORM_VALUES.releaseYear[0]}
              max={DEFAULT_FORM_VALUES.releaseYear[1]}
            />
          </div>
        )}
      />
      <Controller
        name="sortBy"
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <Select {...rest} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(o => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <Controller
        name="sortDirection"
        control={control}
        render={({ field: { onChange, ...rest } }) => (
          <Select {...rest} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Button>
        <SearchIcon />
      </Button>
    </form>
  );
};

export const GameSearchForm = memo(GameSearchFormComponent);
