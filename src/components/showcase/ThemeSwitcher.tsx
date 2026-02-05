import { useTheme } from '@/lib/theme-provider'
import { getAllThemes } from '@/themes'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ThemeSwitcher() {
  const { themeName, setTheme } = useTheme()
  const themes = getAllThemes()

  return (
    <div className="flex items-center gap-4">
      <label
        htmlFor="theme-select"
        className="text-sm font-medium text-text-muted"
      >
        Theme
      </label>
      <Select value={themeName} onValueChange={setTheme}>
        <SelectTrigger id="theme-select" className="w-[200px]">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme) => (
            <SelectItem key={theme.name} value={theme.name}>
              {theme.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
