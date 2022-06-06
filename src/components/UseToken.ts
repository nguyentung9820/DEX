export interface UseTokenProps {
  token?: string;
}
export declare function useToken(props?: UseTokenProps): {
  getTokenProps: (props?: any) => any;
};
export declare type UseDisclosureReturn = ReturnType<typeof useToken>;
