import React, { useState, useEffect, useRef, useCallback } from 'react';

const WorkItemsFilterBar = ({ onFilterChange }) => {
  // State management
  const [filterKeyword, setFilterKeyword] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Refs for dropdown management
  const containerRef = useRef(null);
  const keywordInputRef = useRef(null);

  // Filter options - could be fetched from API
  const filterOptions = {
    types: ['Bug', 'Task', 'User Story', 'Epic', 'Feature'],
    assignees: ['Nitin Arde', 'Chetana Patil', 'Rahul Bendre', 'Prajwal Salunkhe', 'Unassigned'],
    states: ['New', 'Active', 'Resolved', 'Closed', 'Design'],
    areas: ['Dibba Delivery', 'Dibba Admin', 'Dibba Rider'],
    tags: ['Frontend', 'Backend', 'API', 'UI/UX', 'Database', 'Mobile', 'Critical']
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ctrl/Cmd + K to focus search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        keywordInputRef.current?.focus();
      }
      // Escape to close dropdowns
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Debounced filter application
  const applyFilters = useCallback((changedFilter = {}) => {
    const filters = {
      keyword: changedFilter.keyword !== undefined ? changedFilter.keyword : filterKeyword,
      types: changedFilter.types !== undefined ? changedFilter.types : selectedTypes,
      assignees: changedFilter.assignees !== undefined ? changedFilter.assignees : selectedAssignees,
      states: changedFilter.states !== undefined ? changedFilter.states : selectedStates,
      areas: changedFilter.areas !== undefined ? changedFilter.areas : selectedAreas,
      tags: changedFilter.tags !== undefined ? changedFilter.tags : selectedTags,
    };
    onFilterChange(filters);
  }, [filterKeyword, selectedTypes, selectedAssignees, selectedStates, selectedAreas, selectedTags, onFilterChange]);

  // Keyword search handler with debounce
  const handleKeywordChange = (e) => {
    const value = e.target.value;
    setFilterKeyword(value);
    applyFilters({ keyword: value });
  };

  // Toggle functions for each filter type
  const createToggleHandler = (setter, current) => (value) => {
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    setter(updated);
    return updated;
  };

  const toggleType = (type) => {
    const updated = createToggleHandler(setSelectedTypes, selectedTypes)(type);
    applyFilters({ types: updated });
  };

  const toggleAssignee = (assignee) => {
    const updated = createToggleHandler(setSelectedAssignees, selectedAssignees)(assignee);
    applyFilters({ assignees: updated });
  };

  const toggleState = (state) => {
    const updated = createToggleHandler(setSelectedStates, selectedStates)(state);
    applyFilters({ states: updated });
  };

  const toggleArea = (area) => {
    const updated = createToggleHandler(setSelectedAreas, selectedAreas)(area);
    applyFilters({ areas: updated });
  };

  const toggleTag = (tag) => {
    const updated = createToggleHandler(setSelectedTags, selectedTags)(tag);
    applyFilters({ tags: updated });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilterKeyword('');
    setSelectedTypes([]);
    setSelectedAssignees([]);
    setSelectedStates([]);
    setSelectedAreas([]);
    setSelectedTags([]);
    setActiveDropdown(null);
    onFilterChange({
      keyword: '',
      types: [],
      assignees: [],
      states: [],
      areas: [],
      tags: [],
    });
  };

  // Toggle dropdown
  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  // Check if any filters are active
  const hasActiveFilters = 
    filterKeyword || 
    selectedTypes.length > 0 || 
    selectedAssignees.length > 0 || 
    selectedStates.length > 0 || 
    selectedAreas.length > 0 || 
    selectedTags.length > 0;

  // Get total active filters count
  const activeFiltersCount = 
    selectedTypes.length + 
    selectedAssignees.length + 
    selectedStates.length + 
    selectedAreas.length + 
    selectedTags.length;

  // Dropdown component for reusability
  const FilterDropdown = ({ name, label, options, selectedItems, onToggle }) => {
    const isActive = activeDropdown === name;
    const hasSelections = selectedItems.length > 0;

    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(name)}
          className={`
            flex items-center gap-1 px-2.5 py-1.5 rounded text-xs
            transition-all duration-200 ease-in-out
            hover:bg-gray-100
            ${hasSelections ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-600'}
            ${isActive ? 'bg-gray-100 shadow-sm' : ''}
          `}
          aria-expanded={isActive}
          aria-haspopup="true"
        >
          <span className="whitespace-nowrap">
            {label}
            {hasSelections && (
              <span className="ml-1 px-1.5 py-0.5 bg-blue-600 text-white text-[10px] rounded-full">
                {selectedItems.length}
              </span>
            )}
          </span>
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isActive && (
          <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[200px] max-h-[300px] overflow-hidden animate-fadeIn">
            {/* Search within dropdown for longer lists */}
            {options.length > 5 && (
              <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
                <input
                  type="text"
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            <div className="overflow-y-auto max-h-[260px] py-1">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2.5 px-3 py-2 hover:bg-blue-50 cursor-pointer transition-colors group"
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(option)}
                    onChange={() => onToggle(option)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 w-3.5 h-3.5"
                  />
                  <span className="text-xs text-gray-700 group-hover:text-gray-900 select-none">
                    {option}
                  </span>
                  {selectedItems.includes(option) && (
                    <svg className="w-3.5 h-3.5 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              ))}
            </div>

            {/* Footer with actions */}
            {selectedItems.length > 0 && (
              <div className="border-t border-gray-100 p-2 bg-gray-50 sticky bottom-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    options.forEach(option => {
                      if (selectedItems.includes(option)) {
                        onToggle(option);
                      }
                    });
                  }}
                  className="text-[10px] text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear {selectedItems.length} selected
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="bg-gray-50 px-4 md:px-6 py-2.5 border-t border-b border-gray-200">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Search Input */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px] max-w-[350px]">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={keywordInputRef}
            type="text"
            placeholder="Filter by keyword"
            value={filterKeyword}
            onChange={handleKeywordChange}
            className="flex-1 border-none bg-transparent outline-none placeholder-gray-400 text-xs text-gray-700 focus:placeholder-gray-500"
          />
          {filterKeyword && (
            <button
              onClick={() => {
                setFilterKeyword('');
                applyFilters({ keyword: '' });
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <FilterDropdown
            name="types"
            label="Types"
            options={filterOptions.types}
            selectedItems={selectedTypes}
            onToggle={toggleType}
          />

          <FilterDropdown
            name="assignees"
            label="Assigned to"
            options={filterOptions.assignees}
            selectedItems={selectedAssignees}
            onToggle={toggleAssignee}
          />

          <FilterDropdown
            name="states"
            label="States"
            options={filterOptions.states}
            selectedItems={selectedStates}
            onToggle={toggleState}
          />

          <div className="hidden md:block">
            <FilterDropdown
              name="areas"
              label="Area"
              options={filterOptions.areas}
              selectedItems={selectedAreas}
              onToggle={toggleArea}
            />
          </div>

          <div className="hidden lg:block">
            <FilterDropdown
              name="tags"
              label="Tags"
              options={filterOptions.tags}
              selectedItems={selectedTags}
              onToggle={toggleTag}
            />
          </div>

          {/* Clear All Button */}
          {hasActiveFilters && (
            <>
              <div className="h-5 w-px bg-gray-300 mx-0.5" />
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                title="Clear all filters"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Clear all</span>
                {activeFiltersCount > 0 && (
                  <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] rounded-full font-medium">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-2.5 pt-2.5 border-t border-gray-200 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-gray-500 font-medium">Active filters:</span>
          
          {filterKeyword && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px]">
              <span className="text-gray-600">Keyword:</span>
              <span className="font-medium text-gray-800">"{filterKeyword}"</span>
              <button
                onClick={() => {
                  setFilterKeyword('');
                  applyFilters({ keyword: '' });
                }}
                className="ml-0.5 text-gray-400 hover:text-gray-600 text-sm"
              >
                ×
              </button>
            </span>
          )}

          {selectedTypes.map(type => (
            <span key={type} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-200 rounded text-[10px] text-blue-700">
              {type}
              <button onClick={() => toggleType(type)} className="ml-0.5 hover:text-blue-900 text-sm">×</button>
            </span>
          ))}

          {selectedAssignees.map(assignee => (
            <span key={assignee} className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200 rounded text-[10px] text-green-700">
              {assignee}
              <button onClick={() => toggleAssignee(assignee)} className="ml-0.5 hover:text-green-900 text-sm">×</button>
            </span>
          ))}

          {selectedStates.map(state => (
            <span key={state} className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 border border-purple-200 rounded text-[10px] text-purple-700">
              {state}
              <button onClick={() => toggleState(state)} className="ml-0.5 hover:text-purple-900 text-sm">×</button>
            </span>
          ))}

          {selectedAreas.map(area => (
            <span key={area} className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 border border-orange-200 rounded text-[10px] text-orange-700">
              {area}
              <button onClick={() => toggleArea(area)} className="ml-0.5 hover:text-orange-900 text-sm">×</button>
            </span>
          ))}

          {selectedTags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-pink-50 border border-pink-200 rounded text-[10px] text-pink-700">
              {tag}
              <button onClick={() => toggleTag(tag)} className="ml-0.5 hover:text-pink-900 text-sm">×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkItemsFilterBar;
