export const useSingleLookup = async (queryUrl: string, searchBy: string, searchTerm: string) => {
  const response = await fetch(`${queryUrl}/${searchBy}/single/${searchTerm}`);
  const data = await response.json();
  console.log(data);
}