export const handleBlur = (
  event: React.FocusEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const { name } = event.target;
  setTouched((prev) => ({ ...prev, [name]: true }));
};
