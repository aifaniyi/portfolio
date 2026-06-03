import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { skillsByCategory } from '@/data';
import type { SkillCategory } from '@/types';

const proficiencyColors = {
  beginner: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  intermediate: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  advanced: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  expert: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
};

export function SkillsSection() {
  const categories = Object.keys(skillsByCategory) as SkillCategory[];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Technical Skills</h3>

      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="w-full flex-wrap h-auto gap-2 bg-transparent p-0">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2"
            >
              {category}
              <span className="ml-2 text-xs opacity-70">
                ({skillsByCategory[category].length})
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsByCategory[category].map((skill) => (
                <div
                  key={skill.name}
                  className="group relative p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                >
                  {/* Skill Name */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {skill.name}
                    </h4>
                    {skill.yearsOfExperience && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {skill.yearsOfExperience}y
                      </span>
                    )}
                  </div>

                  {/* Proficiency Badge */}
                  {skill.proficiency && (
                    <Badge
                      variant="outline"
                      className={`text-xs font-medium ${
                        proficiencyColors[skill.proficiency]
                      }`}
                    >
                      {skill.proficiency}
                    </Badge>
                  )}

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
