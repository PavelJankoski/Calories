import FilterBox from "./filter-box/FilterBox";
import {useCallback, useEffect, useMemo, useState} from "react";
import {
    initialCreateEditFoodEntryState,
    initialDeleteFoodEntryState,
    initialFilterState,
    sortingCriteria
} from "./FoodEntriesHelper";
import {updateObject} from "../../utils/utils";
import ActionsAboveTable from "./actions-above-table/ActionsAboveTable";
import FoodEntriesTable from "./tables/food-entries-table/FoodEntriesTable";
import {dailyThresholdsTableHeadLabels, foodEntriesTableHeadLabels} from "../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../store/actions';
import {Typography} from "@material-ui/core";
import {useFoodEntriesStyles} from "./FoodEntriesStyles";
import DailyThresholdsTable from "./tables/daily-thresholds-table/DailyThresholdsTable";
import DeleteFoodEntryDialog from "./dialogs/delete-food-entry-dialog/DeleteFoodEntryDialog";
import CreateEditFoodEntryDialog from "./dialogs/create-edit-food-entry-dialog/CreateEditFoodEntryDialog";

const FoodEntries = () => {
    const [filter, setFilter] = useState(initialFilterState);
    const [liveFilter, setLiveFilter] = useState(initialFilterState);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteFoodEntry, setDeleteFoodEntry] = useState(initialDeleteFoodEntryState);
    const [isEdit, setIsEdit] = useState(false);
    const [openCreateEditDialog, setOpenCreateEditDialog] = useState(false);
    const [createEditFoodEntry, setCreateEditFoodEntry] = useState(initialCreateEditFoodEntryState);
    const [sorting, setSorting] = useState("takenOn,desc");
    const [isResetDisabled, setIsResetDisabled] = useState(true);
    const foodEntries = useSelector(state => state.foodEntriesReducer.foodEntries);
    const dailyThresholds = useSelector(state => state.foodEntriesReducer.dailyThresholds);
    const deleteLoading = useSelector((state) => state.foodEntriesReducer.dialogLoading.deleteLoading);
    const createEditLoading = useSelector((state) => state.foodEntriesReducer.dialogLoading.createEditLoading);
    const dispatch = useDispatch();
    const classes = useFoodEntriesStyles();
    const role = useSelector(state => state.authReducer.role);

    const handleFilterInputChange = useCallback((e) => {
        setLiveFilter(updateObject(liveFilter, {[e.target.name]: e.target.value}))
    }, [liveFilter]);

    const handleDateInputChange = useCallback((val, dateName) => {
        setLiveFilter(updateObject(liveFilter, {[dateName]: val}))
    }, [liveFilter]);

    const handleApplyButton = useCallback(() => {
        setFilter({...liveFilter});
        setIsResetDisabled(false);
    }, [setFilter, liveFilter]);

    const handleResetButton = useCallback(() => {
        setIsResetDisabled(true);
        setLiveFilter(initialFilterState);
        setFilter(initialFilterState);
    }, []);

    const fetchFoodEntries = useCallback((page = 0, rowsPerPage = 5, sorting) => {
        dispatch(actions.fetchFoodEntries(page, rowsPerPage, sorting, filter));
    }, [dispatch, filter]);

    const handleOpenDeleteDialog = useCallback((foodEntry) => {
        setDeleteFoodEntry(foodEntry);
        setOpenDeleteDialog(true);
    }, []);

    const handleCreateEditInputChange = useCallback((val) => {
        setCreateEditFoodEntry(
            {
                ...createEditFoodEntry,
                calories: val
            }
        )
    }, [createEditFoodEntry]);

    const handleCreateDialogOpen = useCallback(() => {
        setCreateEditFoodEntry(initialCreateEditFoodEntryState);
        setIsEdit(false);
        setOpenCreateEditDialog(true);
    }, [])

    const handleEditDialogOpen = useCallback((foodEntry) => {
        setCreateEditFoodEntry(foodEntry);
        setIsEdit(true);
        setOpenCreateEditDialog(true);
    }, [])


    const handleCreateEditDateChange = useCallback((val) => {
        setCreateEditFoodEntry(
            {
                ...createEditFoodEntry,
                takenOnDate: val
            }
        )
    }, [createEditFoodEntry])

    useEffect(() => {
        fetchFoodEntries(0, 5, sorting);
    }, [filter, fetchFoodEntries, sorting])

    useEffect(() => {
        dispatch(actions.fetchDailyThresholds());
    }, [dispatch])

    const foodEntriesTableHeaderCells = useMemo( () =>{
        return [
            {minWidth: 100, label: foodEntriesTableHeadLabels.ID},
            {minWidth: 100, label: foodEntriesTableHeadLabels.FOOD_NAME},
            {minWidth: 100, label: foodEntriesTableHeadLabels.TIME_ADDED},
            {minWidth: 100, label: foodEntriesTableHeadLabels.CALORIES},
            ...role === "ROLE_ADMIN" ? [{minWidth: 100, label: foodEntriesTableHeadLabels.USER_ID}] : [],
            ...role === "ROLE_ADMIN" ? [{minWidth: 100, label: foodEntriesTableHeadLabels.ACTIONS, align: "center"}] : []
        ]
    }, [role]);

    const dailyThresholdsTableHeaderCells = useMemo( () =>{
        return [
            {minWidth: 100, label: dailyThresholdsTableHeadLabels.DATE},
            {minWidth: 100, label: dailyThresholdsTableHeadLabels.CALORIES}
        ]
    }, []);

    return (
        <>
            <FilterBox filter={liveFilter}
                       handleInputChange={handleFilterInputChange}
                       handleDateInputChange={handleDateInputChange}
                       handleApplyButton={handleApplyButton}
                       handleResetButton={handleResetButton}
                       isResetDisabled={isResetDisabled}/>
            <ActionsAboveTable sortingValue={sorting}
                               changeSortingCriteria={setSorting}
                               sortingCriteria={sortingCriteria}
                               createButtonText="Create Entry"
                               handleButtonClick={handleCreateDialogOpen} />
            <FoodEntriesTable count={foodEntries.count}
                              tableData={foodEntries.data}
                              headCells={foodEntriesTableHeaderCells}
                              loading={foodEntries.loading}
                              rowsPerPage={foodEntries.rowsPerPage}
                              page={foodEntries.page}
                              handleOpenDeleteDialog={handleOpenDeleteDialog}
                              handleOpenEditDialog={handleEditDialogOpen}
                              fetchData={(page, rowsPerPage) => fetchFoodEntries(page, rowsPerPage, sorting)} />
            <div className={classes.dailyThresholdsDiv}>
                <Typography variant="subtitle2" className={classes.dailyThresholdTitle}>Days with passed calories threshold</Typography>
                <DailyThresholdsTable tableData={dailyThresholds.data}
                                      headCells={dailyThresholdsTableHeaderCells}
                                      loading={dailyThresholds.loading} />
            </div>
            {openDeleteDialog || deleteLoading ? <DeleteFoodEntryDialog open={openDeleteDialog || deleteLoading}
                                                                  handleDialogClose={() => setOpenDeleteDialog(false)}
                                                                  foodEntry={deleteFoodEntry} /> : null}
            {openCreateEditDialog || createEditLoading ?
                <CreateEditFoodEntryDialog open={openCreateEditDialog || createEditLoading}
                                           handleDialogClose={() => setOpenCreateEditDialog(false)}
                                           foodEntry={createEditFoodEntry}
                                           handleDateInputChange={handleCreateEditDateChange}
                                           handleOnInputChange={handleCreateEditInputChange}
                                           isEdit={isEdit}/> : null}
        </>
    )
}

export default FoodEntries;
