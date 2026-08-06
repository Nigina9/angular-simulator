import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

  @Input({ required: true }) user!: { name: string, age: number };

}
/*
Компонент child использует OnPush, поэтому ангуляр не проверяет на каждом цикле.
OnPush делает проверку только в определенных случаях, например когда в событие проиходит в самом компоненте.
Когда я делаю метод :
  changeUserName() {
    this.user.name = 'Eugene'
  }
  я мутирую объект, не создаю новый, меняю просто поле. Поэтому переменная user в parent компоненте
  указывает на тот же самый обънект в памяти, просто там поле name заменено.
  Когда ангуляр сравнивает user дочернегого компонента и с предыдущим значением, понимает что ничего не изменилось.
  Поэтому данные не поменялись, имя не меняется.

  Чтобы решить задачу, я использовалала оператор spead, он создает новый объект с новой ссылкой.
  Ангуляр сравнивает @input по ссылке, если она изменилась, компонент пройдет проверку и DOM обновится.
*/
