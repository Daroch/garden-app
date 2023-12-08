/* eslint-disable react/prop-types */
export default function Search({
  categories,
  setErrorText,
  handleSubmitSearch,
  searchData,
  setSearchData,
}) {
  const FASTAPI_URL = import.meta.env.VITE_FASTAPI_URL;

  const handleChange = event => {
    setSearchData({
      ...searchData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='searchform-container-wrapper'>
      <form onSubmit={handleSubmitSearch} className='search-form-wrapper'>
        <input
          type='text'
          name='search_text'
          placeholder='Search text'
          value={searchData.search_text}
          onChange={handleChange}
        />
        <select
          name='search_category_id'
          placeholder='Categoría'
          value={searchData.search_category}
          onChange={handleChange}
          className='select-element'
        >
          {' '}
          <option value='0'>All</option>
          {categories.map(category => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <div>
          <button className='btn' type='submit'>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
