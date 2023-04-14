export default interface FocusResetProps {
  resetFocusRef?: React.MutableRefObject<
    HTMLDivElement | HTMLHeadingElement | HTMLInputElement | null
  >;
}
