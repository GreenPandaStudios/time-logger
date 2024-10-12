import React, { useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addActivity, getAllActivities, updateDescription, deleteActivity } from '../../state/activities/activity-slice';
import { ThingHub } from '../../features';
import { IActivity, IHaveId } from '../../types';

export const Activities = () => {

  const activities = useAppSelector(getAllActivities);

  const things = useMemo(() => Object.values(activities).map((activity: IActivity & IHaveId) =>
    ({ id: activity.id, userEnteredName: activity.description })), [activities]);

  const dispatch = useAppDispatch();

  const onCreate = useCallback((userEnteredName: string) => {
    dispatch(addActivity({ activity: { description: userEnteredName } }));
  }, [])

  const onEdit = useCallback((id: string, newText: string) => {
    dispatch(updateDescription({ id, description: newText }));
  }, [updateDescription]);

  const onDelete = useCallback((id: string) => {
    dispatch(deleteActivity({ id }));
  }, [deleteActivity]);

  return <ThingHub title="Activities" onEdit={onEdit} onDelete={onDelete} onCreate={onCreate} things={things} instructions='Enter a new activity ...'/>
}