"use client"
import 'dotenv/config';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/atoms/button"
import { Input } from "@/components/ui/atoms/input"
import { Label } from "@/components/ui/atoms/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/atoms/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/atoms/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/atoms/dialog"
import { Badge } from "@/components/ui/atoms/badge"
import { Textarea } from "@/components/ui/atoms/textarea"
import { Switch } from "@/components/ui/atoms/switch"
import { Trash2, Edit, Plus, Search } from "lucide-react"
import { useToast } from "@/hooks/useToast"
import { Discipline, DisciplineFormData } from "@/interface/IDisciplina"
import { Hint } from '@/components/ui/atoms/tooltip';

export default function DisciplinasPage() {
    const [disciplines, setDisciplines] = useState<Discipline[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [editingDiscipline, setEditingDiscipline] = useState<Discipline | null>(null)
    const [formData, setFormData] = useState<DisciplineFormData>({
        name: "",
        description: "",
        active: true,
    })
    const { toast } = useToast()
    const apiUrl = process.env.API_URL || 'http://localhost:5000'

    // disciplines
    const fetchDisciplines = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams()
            if (searchQuery) params.append("q", searchQuery)

            const response = await fetch(`${apiUrl}/api/disciplinas?${params}`)
            if (!response.ok) throw new Error("Erro ao carregar disciplinas")

            const data = await response.json()
            setDisciplines(data.items || [])
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível carregar as disciplinas",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    // Create discipline
    const createDiscipline = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/disciplinas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Erro ao criar disciplina")
            }

            toast({
                title: "Sucesso",
                description: "Disciplina criada com sucesso",
            })

            setIsCreateDialogOpen(false)
            resetForm()
            fetchDisciplines()
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive",
            })
        }
    }

    // Update discipline
    const updateDiscipline = async () => {
        if (!editingDiscipline) return

        try {
            const response = await fetch(`${apiUrl}/api/disciplinas/${editingDiscipline._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Erro ao atualizar disciplina")
            }

            toast({
                title: "Sucesso",
                description: "Disciplina atualizada com sucesso",
            })

            setIsEditDialogOpen(false)
            setEditingDiscipline(null)
            resetForm()
            fetchDisciplines()
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive",
            })
        }
    }

    // Delete discipline
    const deleteDiscipline = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir esta disciplina?")) return

        try {
            const response = await fetch(`${apiUrl}/api/disciplinas/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Erro ao excluir disciplina")

            toast({
                title: "Sucesso",
                description: "Disciplina excluída com sucesso",
            })

            fetchDisciplines()
        } catch (error) {
            toast({
                title: "Erro",
                description: "Não foi possível excluir a disciplina",
                variant: "destructive",
            })
        }
    }

    const resetForm = () => {
        setFormData({ name: "", description: "", active: true })
    }

    const openEditDialog = (discipline: Discipline) => {
        setEditingDiscipline(discipline)
        setFormData({
            name: discipline.name,
            description: discipline.description || "",
            active: discipline.active,
        })
        setIsEditDialogOpen(true)
    }

    useEffect(() => {
        fetchDisciplines()
    }, [searchQuery])

    return (
        <div className="container mx-auto py-8 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Gerenciar Disciplinas</CardTitle>
                    <CardDescription>Crie, edite e gerencie as disciplinas do sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Search and Create */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar disciplinas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className={'cursor-pointer'} onClick={resetForm}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Nova Disciplina
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Criar Nova Disciplina</DialogTitle>
                                    <DialogDescription>Preencha os dados da nova disciplina</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Nome *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Nome da disciplina"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="description">Descrição</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Descrição da disciplina (opcional)"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="active"
                                            checked={formData.active}
                                            onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                                        />
                                        <Label htmlFor="active">Disciplina ativa</Label>
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                        <Button onClick={createDiscipline} className="flex-1">
                                            Criar Disciplina
                                        </Button>
                                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                                            Cancelar
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Table */}
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Descrição</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Criada em</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8">
                                            Carregando disciplinas...
                                        </TableCell>
                                    </TableRow>
                                ) : disciplines.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                            {searchQuery ? "Nenhuma disciplina encontrada" : "Nenhuma disciplina cadastrada"}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    disciplines.map((discipline) => (
                                        <TableRow key={discipline._id}>
                                            <TableCell className="font-medium">{discipline.name}</TableCell>
                                            <TableCell className="max-w-xs truncate">{discipline.description || "-"}</TableCell>
                                            <TableCell>
                                                <Badge variant={discipline.active ? "default" : "secondary"}>
                                                    {discipline.active ? "Ativa" : "Inativa"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{new Date(discipline.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <Hint label="Editar">
                                                        <Button className="cursor-pointer hover:text-white hover:bg-yellow-600" variant="outline" size="sm" onClick={() => openEditDialog(discipline)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Hint>

                                                    <Hint label="Excluir" tone="destructive">
                                                        <Button  className="cursor-pointer hover:text-white hover:bg-red-600" variant="outline" size="sm" onClick={() => deleteDiscipline(discipline._id)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </Hint>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Disciplina</DialogTitle>
                        <DialogDescription>Altere os dados da disciplina</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit-name">Nome *</Label>
                            <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Nome da disciplina"
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-description">Descrição</Label>
                            <Textarea
                                id="edit-description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Descrição da disciplina (opcional)"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="edit-active"
                                checked={formData.active}
                                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                            />
                            <Label htmlFor="edit-active">Disciplina ativa</Label>
                        </div>
                        <div className="flex gap-2 pt-4">
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                                Cancelar
                            </Button>
                            <Button onClick={updateDiscipline} className="flex-1">
                                Salvar Alterações
                            </Button>
                         </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
