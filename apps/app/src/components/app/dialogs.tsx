'use client'
import type { FC } from 'react'
import {
  Dialog,
  DialogAction,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

const DialogsComponent: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-full w-full">
      <Dialog>
        <DialogTrigger type={'border'}>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogAction
              action="base"
              onPress={() => {
                alert('profile saved')
              }}>
              Save
            </DialogAction>
            <DialogAction action="cancel">Cancel</DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger
          shape={'rounded'}
          type={'border'}>
          Rounded
        </DialogTrigger>
        <DialogContent shape={'rounded'}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogAction
              shape={'rounded'}
              action="base"
              onPress={() => {
                alert('profile saved')
              }}>
              Save
            </DialogAction>
            <DialogAction
              shape={'rounded'} action="cancel">Cancel</DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { DialogsComponent }
