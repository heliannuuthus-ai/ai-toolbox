import { useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd";
import debounce from "lodash/debounce";

type OptionType = SelectProps["options"];

// 组件的 Props 类型
export interface DebounceSelectProps<T, V>
  extends Omit<SelectProps<V | V[]>, "children"> {
  value?: V | V[] | null; // value 可以是单值、数组或 null
  retriever: (search: string | null) => Promise<T[]>; // retriever 获取数据
  mapping: (item: T[]) => OptionType; // 将原始数据映射为选项
  debounceTimeout?: number; // 防抖延迟
}

const DebounceSelect = <T, V>({
  retriever,
  mapping,
  debounceTimeout = 800,
  value: controlledValue,
  ...props
}: DebounceSelectProps<T, V>) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<OptionType | null>(null);
  const fetchRef = useRef(0);

  // 防抖搜索逻辑
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions(null); // 清空现有选项
      setFetching(true);

      retriever(value).then((rawOptions) => {
        if (fetchId !== fetchRef.current) {
          return; // 防止异步顺序问题
        }

        const newOptions = mapping(rawOptions);
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [retriever, mapping, debounceTimeout]);

  return (
    <Select
      showSearch
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options || []}
      {...props}
    />
  );
};

export default DebounceSelect;
