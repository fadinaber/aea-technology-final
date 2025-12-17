import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface Specification {
  parameter: string
  value: string
}

interface SpecTableProps {
  title: string
  icon: LucideIcon
  specifications: Specification[]
}

export function SpecTable({ title, icon: Icon, specifications }: SpecTableProps) {
  return (
    <Card className="border-border p-0 overflow-hidden">
      <CardHeader className="bg-muted px-6 py-4">
        <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {specifications.map((spec, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-foreground w-1/3 text-sm sm:text-base">
                    {spec.parameter}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-foreground text-sm sm:text-base">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
