"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

export function DatePicker({ selectedDate, onDateSelect, minDate, maxDate }) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate?.getMonth() || new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(selectedDate?.getFullYear() || new Date().getFullYear())

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  const isDateDisabled = (date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const handleDateClick = (day) => {
    const date = new Date(currentYear, currentMonth, day)
    if (!isDateDisabled(date)) {
      onDateSelect(date)
    }
  }

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
    onDateSelect(today)
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Dias vazios do início do mês
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2"></div>
      )
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const disabled = isDateDisabled(date)
      const today = isToday(date)
      const selected = isSelected(date)

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={disabled}
          className={`
            p-2 text-sm rounded-md transition-colors
            ${disabled 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'hover:bg-blue-100 cursor-pointer'
            }
            ${today 
              ? 'bg-blue-500 text-white font-bold' 
              : ''
            }
            ${selected && !today 
              ? 'bg-blue-200 text-blue-800 font-semibold' 
              : ''
            }
            ${!disabled && !today && !selected 
              ? 'text-gray-700 hover:bg-gray-100' 
              : ''
            }
          `}
        >
          {day}
        </button>
      )
    }

    return days
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
            ←
          </Button>
          <CardTitle className="text-lg">
            {months[currentMonth]} {currentYear}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={goToNextMonth}>
            →
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="p-2 text-xs font-semibold text-gray-500 text-center">
              {day}
            </div>
          ))}
        </div>

        {/* Calendário */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>

        {/* Botões de ação */}
        <div className="flex justify-between mt-4 space-x-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Hoje
          </Button>
          {selectedDate && (
            <Button variant="outline" size="sm" onClick={() => onDateSelect(null)}>
              Limpar
            </Button>
          )}
        </div>

        {/* Data selecionada */}
        {selectedDate && (
          <div className="mt-3 p-2 bg-blue-50 rounded-md text-center">
            <p className="text-sm text-blue-700">
              Data selecionada: {selectedDate.toLocaleDateString('pt-BR')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function CalendarDemo() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)

  const today = new Date()
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 6) // 6 meses no futuro

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Agende uma Demonstração
          </h2>
          <p className="text-xl text-gray-600">
            Escolha a melhor data para conhecer nossa plataforma
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex-1 max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Selecione uma Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    📅 {selectedDate 
                      ? selectedDate.toLocaleDateString('pt-BR')
                      : 'Clique para selecionar uma data'
                    }
                  </Button>
                  
                  {showCalendar && (
                    <div className="mt-4">
                      <DatePicker
                        selectedDate={selectedDate}
                        onDateSelect={(date) => {
                          setSelectedDate(date)
                          setShowCalendar(false)
                        }}
                        minDate={today}
                        maxDate={maxDate}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1 max-w-md">
            <Card>
              <CardHeader>
                <CardTitle>Horários Disponíveis</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 mb-4">
                      Horários para {selectedDate.toLocaleDateString('pt-BR')}:
                    </p>
                    {['09:00', '10:30', '14:00', '15:30', '16:30'].map(time => (
                      <Button 
                        key={time}
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        🕒 {time}
                      </Button>
                    ))}
                    <div className="mt-6">
                      <Button className="w-full">
                        Confirmar Agendamento
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-4 block">📅</span>
                    <p className="text-gray-500">
                      Selecione uma data para ver os horários disponíveis
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <span className="text-3xl mb-3 block">⏱️</span>
              <h3 className="font-semibold mb-2">Duração</h3>
              <p className="text-sm text-gray-600">
                A demonstração dura aproximadamente 30 minutos
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <span className="text-3xl mb-3 block">💻</span>
              <h3 className="font-semibold mb-2">Online</h3>
              <p className="text-sm text-gray-600">
                Demonstração realizada via videoconferência
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <span className="text-3xl mb-3 block">🎁</span>
              <h3 className="font-semibold mb-2">Grátis</h3>
              <p className="text-sm text-gray-600">
                Sem custos e sem compromisso
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}