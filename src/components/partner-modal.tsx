'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { PartnerFlow } from '@/components/partner/partner-flow'

interface Props {
  open: boolean
  onClose: () => void
}

export function PartnerModal({ open, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose()
      }}
    >
      <DialogContent
        showCloseButton={true}
        className="max-w-[95vw] sm:max-w-[780px] md:max-w-[840px] p-5 sm:p-8 rounded-[4px] border-2 border-[#111418] bg-[#FAF7F0] shadow-[10px_10px_0px_#111418] gap-0 text-[#111418] max-h-[92vh] overflow-y-auto"
      >
        <DialogTitle className="sr-only">
          Partner with IFSA NIT Trichy
        </DialogTitle>
        <div className="pt-2 sm:pt-0">
          <PartnerFlow isModal={true} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
